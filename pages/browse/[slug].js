import BrowseNav from "../../components/BrowseNav"
import Products from "../../components/Products"

import { PRODUCTS_PER_PAGE, genQuanArr } from "../../constants"
import { connectDB } from "../../util/db"
import { Product } from "../../models"

export default function BrowsePage({ products, totalPages, slug }) {
  if (!products || products.length === 0) {
    return <h1 className="display-4 m-5">Store Maintenance</h1>
  }

  return (
    <>
      <h1 className="display-3 mt-3">Products</h1>
      <Products products={products} />
      <BrowseNav totalPages={totalPages} page={slug} />
    </>
  )
}

export async function getStaticProps(context) {
  const slugNum = Number(context.params.slug)

  await connectDB()

  const allProducts = await Product.find({})
    .lean()
    .catch(err => {
      console.error("getStaticProps Product.find failed", err)
      return []
    })

  const totalPages = Math.max(
    1,
    Math.ceil(allProducts.length / PRODUCTS_PER_PAGE),
  )

  const splitArr = []
  for (let i = 0; i < allProducts.length; i += PRODUCTS_PER_PAGE) {
    splitArr.push(allProducts.slice(i, i + PRODUCTS_PER_PAGE))
  }

  const rawProducts = splitArr[slugNum - 1] || []

  const products = JSON.parse(JSON.stringify(rawProducts))

  return {
    props: {
      products,
      totalPages,
      slug: String(context.params.slug),
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  await connectDB()

  const count = await Product.countDocuments({}).catch(err => {
    console.error("getStaticPaths countDocuments failed", err)
    return 0
  })

  const totalPages = Math.max(1, Math.ceil(count / PRODUCTS_PER_PAGE))

  const paths = genQuanArr(totalPages).map(page => ({
    params: { slug: String(page) },
  }))

  return { paths, fallback: false }
}
