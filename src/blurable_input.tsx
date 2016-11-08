import * as React from "react";

interface BIProps {
    value: string;
    onCommit: Function;
    type?: "text" | "number" | "email" | "password";
}

interface BIState {
    buffer?: string;
    isEditing?: boolean;
}

export class BlurableInput extends React.Component<BIProps, BIState> {
    constructor(props: BIProps) {
        super();
        this.state = { buffer: "", isEditing: false };
    }

    maybeCommit(e: React.SyntheticEvent<HTMLInputElement>) {
        if (this.state.buffer) { this.props.onCommit(e); }
        this.setState({ isEditing: false, buffer: "" });
    }

    focus() {
        this.setState({ isEditing: true, buffer: this.props.value });
    }

    updateBuffer(e: React.SyntheticEvent<HTMLInputElement>) {
        let buffer = e.currentTarget.value;
        this.setState({ buffer });
    }

    render() {
        let value = this.state.isEditing ? this.state.buffer : this.props.value;
        return <input value={value}
            onFocus={this.focus.bind(this)}
            onChange={this.updateBuffer.bind(this)}
            onBlur={this.maybeCommit.bind(this)}
            type={this.props.type || "text"} />;
    }
}
