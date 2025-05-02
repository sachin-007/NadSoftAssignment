const calculatePagination = (page, limit, totalCount) => {
    const currentPage = parseInt(page, 10) || 1;
    const itemsPerPage = parseInt(limit, 10) || 10;
    const offset = (currentPage - 1) * itemsPerPage;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return { offset, totalPages };
};

module.exports = { calculatePagination };