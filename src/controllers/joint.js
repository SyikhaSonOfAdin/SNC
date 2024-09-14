const { jointServices } = require("../services/joint");

const jointController = {
  add: {
    onlyOne: async (req, res, next) => {
      const {
        projectId,
        userId,
        jointNo,
        shopField,
        diameter,
        itemCode1,
        itemCode2,
        identCode1,
        identCode2,
        isoNo,
      } = req.body;
      if (
        !projectId ||
        !userId ||
        !jointNo ||
        !shopField ||
        !diameter ||
        !itemCode1 ||
        !itemCode2 ||
        !identCode1 ||
        !identCode2 ||
        !isoNo
      )
        return res.status(400).json({ message: "Invalid Parameter" });
      try {
        await jointServices.add.onlyOne(
          projectId,
          userId,
          jointNo,
          shopField,
          diameter,
          itemCode1,
          itemCode2,
          identCode1,
          identCode2,
          isoNo
        );
        return res.status(200).json({
          message: "Joint added Successfully",
          data: [],
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    },
  },
  delete: {
    all: async (req, res, next) => {
      const { projectId } = req.body;
      if (!projectId)
        return res.status(400).json({ message: "Invalid Parameter" });
      try {
        await jointServices.delete.all(projectId);
        return res.status(200).json({
          message: "Joint Deleted Successfully",
          data: [],
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    },
    onlyOne: async (req, res, next) => {
      const { jointId } = req.body;
      if (!jointId)
        return res.status(400).json({ message: "Invalid Parameter" });
      try {
        await jointServices.delete.onlyOne(jointId);
        return res.status(200).json({
          message: "Joint Deleted Successfully",
          data: [],
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    },
    perIsometric: async (req, res, next) => {
      const { isometricId } = req.body;
      if (!isometricId)
        return res.status(400).json({ message: "Invalid Parameter" });
      try {
        await jointServices.delete.perIsometric(isometricId);
        return res.status(200).json({
          message: "Joint Deleted Successfully",
          data: [],
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    },
  },
  edit: async (req, res, next) => {
    const {
      userId,
      jointId,
      jointNo,
      shopField,
      diameter,
      itemCode1,
      itemCode2,
      identCode1,
      identCode2,
      heatNo1,
      heatNo2,
    } = req.body;
    if (
      !userId ||
      !jointId ||
      !jointNo ||
      !shopField ||
      !diameter ||
      !itemCode1 ||
      !itemCode2 ||
      !identCode1 ||
      !identCode2 ||
      !heatNo1 ||
      !heatNo2
    )
      return res.status(400).json({ message: "Invalid Parameter" });

    try {
      await jointServices.edit(
        userId,
        jointId,
        jointNo,
        shopField,
        diameter,
        itemCode1,
        itemCode2,
        identCode1,
        identCode2,
        heatNo1,
        heatNo2
      );
      return res.status(200).json({
        message: "Joint edited Successfully",
        data: [],
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  get: {
    perIsometric: async (req, res, next) => {
      const isometricId = req.params.isometricId;
      if (!isometricId)
        return res.status(400).json({ message: "Invalid Parameter" });
      try {
        const data = await jointServices.get.perIsometric(isometricId);
        return res.status(200).json({
          message: "Get per isometric Successfully",
          data: data,
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    },
  },
};

module.exports = {
  jointController,
};
