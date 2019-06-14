const router = require('express').Router();
const controller = require('./controller');

router.route('/restaurants')
  .get(controller.getOneRandom)
  .post(controller.postOne)
  .delete(controller.deleteAll);

router.route('/restaurants/:id')
  .get(controller.getOne)
  .delete(controller.deleteOne)
  .put(controller.updateOne)

module.exports = router;