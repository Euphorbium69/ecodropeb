module.exports.index = async (req, res) => {
  try {
    const aboutPage = 'About Page';
    res.render('about/index', { aboutPage });
  } catch (err) {
    console.error(err.message);
  }
};
