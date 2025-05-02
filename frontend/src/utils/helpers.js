export const calculatePagination = (page, limit, totalCount) => {
    const currentPage = parseInt(page, 10) || 1;
    const itemsPerPage = parseInt(limit, 10) || 10;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return { currentPage, itemsPerPage, totalPages };
};