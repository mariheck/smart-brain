import React, { Component } from 'react';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const particlesOptions = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
};

const initialState = {
    route: 'signin',
    isSignedIn: false,
    input: '',
    imageUrl: '',
    box: {},
    user: {
        id: '',
        name: '',
        pseudo: '',
        entries: 0,
        joined: ''
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = data => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                pseudo: data.pseudo,
                entries: data.entries,
                joined: data.joined
            }
        });
    };

    onRouteChange = route => {
        this.setState({ route: route });
        if (route === 'signout') {
            this.setState(initialState);
        } else if (route === 'home') {
            this.setState({ isSignedIn: true });
        }
    };

    calculateFaceLocation = data => {
        const clarifaiFace =
            data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - clarifaiFace.right_col * width,
            bottomRow: height - clarifaiFace.bottom_row * height
        };
    };

    displayFaceBox = box => {
        this.setState({ box: box });
    };

    onInputChange = event => {
        this.setState({ input: event.target.value });
    };

    onPictureSubmit = () => {
        this.setState({ imageUrl: this.state.input });
        fetch('http://localhost:3000/imageurl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                input: this.state.input
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    fetch('http://localhost:3000/image', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState({
                                user: { ...this.state.user, entries: count }
                            });
                        })
                        .catch(console.log);
                }
                this.displayFaceBox(this.calculateFaceLocation(response));
            })
            .catch(err => console.log(err));
    };

    render() {
        const { isSignedIn, route, imageUrl, box } = this.state;

        return (
            <div className="App">
                <Particles className="particles" params={particlesOptions} />
                <Navigation
                    isSignedIn={isSignedIn}
                    onRouteChange={this.onRouteChange}
                />
                {route === 'home' ? (
                    <main>
                        <Logo />
                        <Rank
                            name={this.state.user.name}
                            entries={this.state.user.entries}
                        />
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onPictureSubmit={this.onPictureSubmit}
                        />
                        <FaceRecognition imageUrl={imageUrl} box={box} />
                    </main>
                ) : route === 'signin' ? (
                    <SignIn
                        onRouteChange={this.onRouteChange}
                        loadUser={this.loadUser}
                    />
                ) : (
                    <Register
                        onRouteChange={this.onRouteChange}
                        loadUser={this.loadUser}
                    />
                )}
            </div>
        );
    }
}

export default App;
