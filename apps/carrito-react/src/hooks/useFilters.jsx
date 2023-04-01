import { FiltersContext } from '../context/filter'
import { useContext } from 'react'

export const useFilters = (products) => {
  const { filters, setFilters } = useContext(FiltersContext)

  const filteredProducts = products.filter((product) => {
    if (filters.category === 'all') return product.price < filters.minPrice
    return (product.price < filters.minPrice && product.category === filters.category)
  })

  return { filters, filteredProducts, setFilters }
}
