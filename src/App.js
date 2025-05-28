import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Barebone react web app - 2022-Jul26 16:53 PST - Add CI/CD using Github Actions - By Nguyen Viet Hung FE Engineer
        </p>
        <a
          className="App-link"
          href="https://github.com/hungcao14599/cicd-github-react"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github repo: cicd-github-react
        </a>
      </header>
    </div>
  );
}

export default App;
