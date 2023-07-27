import prisma from "../modules/db"; //prisma client

/**
 * @url "/api/products"
 * @param req
 * @param res
 * @returns 'All products for a user'
 *
 */
export const getProducts = async (req, res, next) => {
  //query for all the products for a user
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        products: true,
      },
    });

    res.json({ data: user.products }); //better to use this than just res.json(user.product)
  } catch (err) {
    next(err);
  }
};

/**
 * @url "/api/product/:id"
 * @param req
 * @param res
 */
export const getOneProduct = async (req, res, next) => {
  try {
    //urlencoded middleware turing all params into an obj assigned to params ans attached to the req obj
    const id = req.params.id;

    const product = await prisma.product.findFirst({
      where: {
        id,
        belongsTo: req.user.id,
      },
    });

    res.json({ data: product });
  } catch (err) {
    next(err);
  }
};

/**
 * @url post /api/product
 * @param req
 * @param res
 * @return "created product obj"
 */
export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    });

    res.json({ data: product });
  } catch (err) {
    next(err);
  }
};

/**
 * @url put "api/product/:id"
 * @param req
 * @param res
 */
export const updateProduct = async (req, res, next) => {
  try {
    const updated = await prisma.product.update({
      where: {
        id: req.params.id,
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        },
      },
      data: {
        name: req.body.name,
      },
    });

    res.json({ data: updated });
  } catch (err) {
    next(err);
  }
};

/**
 * @url delete "api/product/:id"
 * @param req
 * @param res
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await prisma.product.delete({
      where: {
        id: req.params.id,
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        },
      },
    });

    res.json({ data: deleted });
  } catch (err) {
    next(err);
  }
};
