import React, { Component } from 'react'

// Wenn die Route nicht gefunden wird, wird diese 404-NotFound Seite geladen.

class NichtGefunden extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center flex-fill align-items-center">
                <h1>Seite nicht gefunden (404)</h1>
            </div>
        )
    }
}

export default NichtGefunden