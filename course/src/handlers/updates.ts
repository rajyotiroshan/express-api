import prisma from "../modules/db";

/**
 * Handlers for updates (update model)
 */

/**
 * @url get "/api/product/:id"
 * @param req
 * @param res
 */
export const getOneUpdate = async (req, res,next) => {
  const updatedData = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: updatedData });
};

/**
 * @url get "/api/updates"
 * @param req
 * @param res
 * @return "all updates for a user" / "all updates for a product"
 */

export const getUpdates = async (req, res,next) => {
  //get all products for a user
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allupdates, products) => {
    return [...allupdates, products.updates];
  }, []);
  res.json({ data: updates });
};

/**
 * @url post "/api/update/" body {prodID, title, body}
 * @param req
 * @param res
 */
export const createUpdate = async (req, res,next) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.prodID,
    },
  });
  if (!product) {
    return res.json({ msg: "nope" });
  }

  const update = await prisma.update.create({
    data: {
      body: req.body.body,
      title: req.body.title,
      product: {
        connect: {
          id: product.id,
        },
      },
    },
  });

  res.json({ data: update });
};

/**
 * @url put /api/update/:updateId
 * @param req
 * @param res
 */
export const updateUpdate = async (req, res,next) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((allupdates, product) => {
    return [...allupdates, ...product.updates];
  }, []);
  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.json({ data: "nope" });
  }

  const updateUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({ data: updateUpdate });
};

/**
 * @url delete "/api/update/:updateid
 * @param req
 * @param res
 */
export const deleteAnUpdate = async (req, res,next) => {
  const deletedUpdate = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deletedUpdate });
};
