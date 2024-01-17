const { selectMovies, selectMovieById } = require("../domains/movie.domain.js");
const handleError = require("../utils/error.js");

const Types = require("../utils/types.d.js");

/**
 * @param {Types.Request} req
 * @param {Types.Response} res
 * @returns {Promise<void>}
 */
async function getMovies(req, res) {
  const { runtimeLt, runtimeGt } = req.query;

  let runTimeLessThan;
  let runTimeGreaterThan;
  if (typeof runtimeLt !== "undefined") {
    runTimeLessThan = Number(runtimeLt);
  }
  if (typeof runtimeGt !== "undefined") {
    runTimeGreaterThan = Number(runtimeGt);
  }

  try {
    const requestedMovies = await selectMovies(
      runTimeLessThan,
      runTimeGreaterThan
    );
    res.json({ movies: requestedMovies });
  } catch (error) {
    handleError(error, res);
  }
}

/**
 * @param {Types.Request} req
 * @param {Types.Response} res
 * @returns {Promise<void>}
 */
async function getMovieById(req, res) {
  const id = Number(req.params.id);

  try {
    const requestedMovie = await selectMovieById(id);
    res.json({ movie: requestedMovie });
  } catch (error) {
    handleError(error, res);
  }
}

module.exports = {
  getMovies,
  getMovieById,
};
