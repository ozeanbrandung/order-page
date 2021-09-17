import { Component } from "react";


class ErrorBoundry extends Component {
    state = {
        hasError: false
    }

    componentDidCatfch(err){
        this.setState({hasError: true});
    }

    render() {
        if (this.state.hasError) {
            return <p>Error icon!</p>
        }
        return this.props.children
    }
}

export default ErrorBoundry;