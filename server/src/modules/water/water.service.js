import Water from "./water.model.js";

export const addWater = async (userId, amount) => {
  return await Water.create({
    user: userId,
    amount,
  });
};

export const getTodayWater = async (userId) => {
  const start = new Date();

  start.setHours(0, 0, 0, 0);

  const end = new Date();

  end.setHours(23, 59, 59, 999);

  const entries = await Water.find({
    user: userId,

    consumedAt: {
      $gte: start,
      $lte: end,
    },
  }).sort({
    consumedAt: -1,
  });

  const total = entries.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return {
    total,

    entries,
  };
};