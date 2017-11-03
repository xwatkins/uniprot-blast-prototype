import React, {Component} from "react";

class BlastForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sequence: ''
        }
        this.handleSequenceChange = this
            .handleSequenceChange
            .bind(this);
        this.submitBlastForm = this
            .submitBlastForm
            .bind(this);
    }

    handleSequenceChange(event) {
        //TODO validate sequence
        this.setState({sequence: event.target.value});
    }

    submitBlastForm(event) {
        this
            .props
            .onFormSubmit(this.state.sequence);
    }

    render() {
        return (
            <div>
                <p>Paste in your protein sequence (<a>example</a>), nucleotide sequence (<a>example</a>), or &nbsp;<a>upload a file</a>&nbsp; with a sequence</p>
                <textarea
                    rows="10"
                    placeholder="Protein sequence, nucleotide sequence"
                    value={this.state.sequence}
                    onChange={this.handleSequenceChange}/>
                <div className="grid-x grid-margin-x">
                    <div className="cell small-6">
                        <label>Current database selection</label>
                        <select>
                            <option value="uniprotkb">UniProtKB</option>
                            <option value="uniprotkb_swissprot">UniProtKB:SwissProt</option>
                        </select>
                    </div>
                    <div className="cell small-6">
                        <label>Restrict by Taxonomy</label>
                        <select></select>
                    </div>
                    <div className="cell">
                        <a>Advanced parameters</a>
                    </div>
                    <div className="cell">
                        <button
                            type="button"
                            className="button float-right"
                            onClick={this.submitBlastForm}>Run BLAST</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BlastForm;