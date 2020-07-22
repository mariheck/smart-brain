import React, { Component } from 'react';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInPseudo: '',
            signInPassword: ''
        };
    }
    onPseudoChange = event => {
        this.setState({ signInPseudo: event.target.value });
    };

    onPasswordChange = event => {
        this.setState({ signInPassword: event.target.value });
    };

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pseudo: this.state.signInPseudo,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            });
    };

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset
                            id="sign_up"
                            className="ba b--transparent ph0 mh0"
                        >
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label
                                    className="db fw6 lh-copy f6"
                                    htmlFor="pseudo"
                                >
                                    Pseudo
                                </label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="pseudo"
                                    id="pseudo"
                                    onChange={this.onPseudoChange}
                                />
                            </div>
                            <div className="mv3">
                                <label
                                    className="db fw6 lh-copy f6"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                                onClick={this.onSubmitSignIn}
                            />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default SignIn;
