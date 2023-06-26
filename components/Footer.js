import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

export default function Footer() {
  return (
    <footer className="my-3">
      <Container>
        <Row>
          <div className="text-muted text-center w-100">
            You can see the source code for this website <a href="https://github.com/codabool/p06-social" className="">here</a><br />
            You can go to my portfolio site <a href="https://codabool.com/projects" className="">here</a>
            <hr/>
          </div>
        </Row>
        <Row className="ms-2">
          <div className="mx-auto" style={{maxWidth: '10rem'}}>
            <a href="https://github.com/codabool" className="me-3">
              <img
                src="/git-logo.jpg"
                alt="github"
                className="rounded-circle"
                width={60}
                height={60}
                />
            </a>
            <a href="https://twitter.com/coda_bool" className="me-3">
              <img
                src="/twitter-logo.jpg"
                alt="twitter"
                className="rounded-circle"
                width={60}
                height={60}
              />
            </a>
          </div>
        </Row>
      </Container>
    </footer>
  )
}
