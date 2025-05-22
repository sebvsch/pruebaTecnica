import ReactPaginate from "react-paginate";
import "./Paginacion.css";

const Paginacion = ({ pagina, totalPages, onPageChange }) => {
    const handlePageChange = (selectedPage) => {
        onPageChange(selectedPage.selected + 1);
    };

    return (
        <div className="mb-4 d-flex justify-content-center">
            <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                initialPage={pagina - 1}
                onPageChange={handlePageChange}
                disableInitialCallback={true}

                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link text-white bg-danger"
                nextClassName="page-item"
                nextLinkClassName="page-link text-white bg-danger"
                breakClassName="page-item disabled"
                breakLinkClassName="page-link"

                previousLabel={
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                        arrow_left
                    </span>
                }
                nextLabel={
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                        arrow_right
                    </span>
                }
                breakLabel="..."
                activeClassName="active"
            />
        </div>
    );
};

export { Paginacion };
