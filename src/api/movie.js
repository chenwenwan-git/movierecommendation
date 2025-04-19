import request from '@/utils/request'

//获取热门电影
export const MovieGetHotService = () => request.get('/movies/hot_movies')

//根据id获取电影
export function getMovieById(movieId) {
  return request.post(`/movies/getMovie/${movieId})`);
}

//根据分类id获取电影
export function cateMovies(cateId) {
  return request.post(`/movies/cate_movies/${cateId})`);
}