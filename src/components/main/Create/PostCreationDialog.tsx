export default function PostCreationDialogue({
    dialogTitle,
    postType,
    setPostType,
    addPost,
  }: {
    dialogTitle: string;
    postType: string;
    setPostType: (name: string) => void;
    addPost: () => void;
  }) {
    return (
      <div
        id="post-creation-dialog"
        className="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                {dialogTitle}{' '}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <input
                className="form-control"
                value={postType}
                placeholder="Module Name"
                onChange={(e) => setPostType(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel{' '}
              </button>
              <button
                onClick={addPost}
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-danger"
              >
                Add Module{' '}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  