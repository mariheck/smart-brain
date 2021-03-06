import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/navigation.component';
import Logo from './components/logo/logo.component';
import SignIn from './components/sign-in/sign-in.component';
import Register from './components/register/register.component';
import Rank from './components/rank/rank.component';
import ImageLinkForm from './components/image-link-form/image-link-form.component';
import FaceRecognition from './components/face-recognition/face-recognition.component';
import Mentions from './components/mentions/mentions.component';
import Footer from './components/footer/footer.component';

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
    route: 'home',
    isSignedIn: false,
    input: '',
    imageUrl: '',
    boxes: [],
    user: {
        id: '',
        pseudo: '',
        entries: 0,
        joined: ''
    }
};

class App extends Component {
    state = initialState;

    loadUser = data => {
        this.setState({
            user: {
                id: data.id,
                pseudo: data.pseudo,
                entries: data.entries,
                joined: data.joined
            }
        });
    };

    onSignIn = () => {
        this.setState({ isSignedIn: true });
    };

    onRouteChange = route => {
        this.setState({ route: route });
        if (route === 'signout') {
            this.setState(initialState);
        }
    };

    calculateFaceLocation = data => {
        const clarifaiFaces = data.outputs[0].data.regions;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);

        return clarifaiFaces.map(face => ({
            leftCol: face.region_info.bounding_box.left_col * width,
            topRow: face.region_info.bounding_box.top_row * height,
            rightCol: width - face.region_info.bounding_box.right_col * width,
            bottomRow:
                height - face.region_info.bounding_box.bottom_row * height
        }));
    };

    displayFaceBox = boxes => {
        this.setState({ boxes: boxes });
    };

    onInputChange = event => {
        this.setState({ input: event.target.value });
    };

    onPictureSubmit = () => {
        this.setState({ imageUrl: this.state.input });
        fetch('https://mariheck-smartbrain-api.herokuapp.com/imageurl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                input: this.state.input
            })
        })
            .then(response => response.json())
            .then(response => {
                if (this.state.isSignedIn && response) {
                    fetch(
                        'https://mariheck-smartbrain-api.herokuapp.com/image',
                        {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                id: this.state.user.id
                            })
                        }
                    )
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
        const {
            isSignedIn,
            route,
            imageUrl,
            boxes,
            user: { pseudo, entries }
        } = this.state;

        return (
            <div className="app">
                <Particles className="particles" params={particlesOptions} />
                <Navigation
                    isSignedIn={isSignedIn}
                    onRouteChange={this.onRouteChange}
                />
                <Logo onRouteChange={this.onRouteChange} />

                {route === 'home' ? (
                    <main>
                        <Rank
                            name={pseudo}
                            entries={entries}
                            isSignedIn={isSignedIn}
                        />
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onPictureSubmit={this.onPictureSubmit}
                        />
                        <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
                    </main>
                ) : route === 'mentions' ? (
                    <Mentions />
                ) : route === 'signin' ? (
                    <SignIn
                        onRouteChange={this.onRouteChange}
                        loadUser={this.loadUser}
                        onSignIn={this.onSignIn}
                    />
                ) : (
                    <Register
                        onRouteChange={this.onRouteChange}
                        loadUser={this.loadUser}
                        onSignIn={this.onSignIn}
                    />
                )}

                <Footer onRouteChange={this.onRouteChange} />
            </div>
        );
    }
}

export default App;
