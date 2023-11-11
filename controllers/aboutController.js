module.exports.index = async (req, res) => {
  try {
    const abouttext = 'hello its about';
    res.render('about/index', { abouttext });
  } catch (err) {
    console.error(err.message);
  }
};
