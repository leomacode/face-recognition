import React, { Component } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Logo from "./components/logo/logo";
import ImgLinkForm from "./components/ImgLinkForm/ImgLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import Singin from "./components/Singin/Singin";
import Register from "./components/Register/Register";

const app = new Clarifai.App({
  apiKey: "5933eec398eb47b8957beb1324ec3423"
});
const particlesOptions = {
  particles: {
    number: {
      value: 180,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imgUrl: "",
      box: {},
      route: "singin",
      isSingin: false
    };
  }

  calFaceLoc = data => {
    const clariFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimg");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clariFace.left_col * width,
      topRow: clariFace.top_row * height,
      rightCol: width - clariFace.right_col * width,
      bottomRow: height - clariFace.bottom_row * height
    };
  };

  displayBox = box => {
    this.setState({ box });
  };

  onSubmit = () => {
    this.setState({ imgUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayBox(this.calFaceLoc(response)))
      .catch(err => console.log(err));
  };

  onInputChange = e => {
    this.setState({ input: e.target.value });
  };

  onRouteChange = route => {
    this.setState({ route: route });
    route === "home"
      ? this.setState({ isSingin: true })
      : this.setState({ isSingin: false });
  };

  render() {
    const { isSingin, box, imgUrl, route } = this.state;

    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Nav isSingin={isSingin} onRouteChange={this.onRouteChange} />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImgLinkForm
              onSubmit={this.onSubmit}
              onInputChange={this.onInputChange}
            />
            <FaceRecognition box={box} imgUrl={imgUrl} />
          </div>
        ) : route === "singin" ? (
          <Singin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
