import React from 'react';
import swal from '@sweetalert/with-react';

function IntModal() {
    return (
        swal(
        <div>
          <h1>Internet Disconnected☹</h1>
          <p>
            Kindly check your connection and refresh the app once.
          </p>
        </div>
      )
    )
}

export default IntModal;
