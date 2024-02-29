import "../App.css";
import PropTypes from 'prop-types';

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
    
    const nbPages = Math.ceil(totalItems / itemsPerPage);
    const getPrevPage = () => {
      if (currentPage > 1) {
        paginate(currentPage - 1);
      }
    }

    const getNextPAge = () => {
      if (currentPage < nbPages) {
        paginate(currentPage + 1);
      }
    }
   
  return (
    <div className="pagination">
     <button onClick={() => getPrevPage()} disabled={currentPage === 1}>PREV</button>
     <p style={{color:"#000", fontWeight: "500"}}>{currentPage} / {nbPages}</p>
     <button onClick={() => getNextPAge()} disabled={currentPage === nbPages}>NEXT</button>
    </div>
  )
}


Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired
};

export default Pagination