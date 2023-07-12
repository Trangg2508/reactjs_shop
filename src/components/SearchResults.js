import { Divider } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SearchResults({ results, input, clearSearch }) {


  return (
    <div>
      {input !== null && results !== null && (
        <div >
          {results.length === 0 ? (
            <div className='search_no_result_box'>
              No results found
            </div>
          ) : (
            <div className="search_result_box">
              {results.map((result) => (
                <Link to={`/detail/${result.id}`} onClick={clearSearch}>
                  <div className="search_result_box_detail">
                    <img src={result.thumbnail} class="search_result_box_image" />
                    <div class='search_result_box_info'>
                      <div class='search_result_box_price'>$ {result.price}</div>
                      <div class='search_result_box_title'>{result.title}</div>
                    </div>
                  </div>
                  <br></br>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
