import Case from "../models/Case.js";

export const createCase = async (req, res) => {
  try {
    const {
      caseNumber,
      court,
      caseCaption,
      judge,
      filedDate,
      caseType,
      parcelId,
      pleas,
      complaint,
      OutstandingBalance,
      totalDeposits,
      depositType,
      totalCosts,
    } = req.body;

    if (
      !caseNumber ||
      !court ||
      !caseCaption ||
      !judge ||
      !filedDate ||
      !caseType
    ) {
      return res.status(400).json({
        message:
          "Case number, court, case caption, judge, filed date and case type are required",
      });
    }

    const existingCase = await Case.findOne({ caseNumber });

    if (existingCase) {
      return res.status(400).json({
        message: "A case with this case number already exists",
      });
    }

    const newCase = await Case.create({
      caseNumber,
      court,
      caseCaption,
      judge,
      filedDate,
      caseType,
      parcelId,
      pleas,
      complaint,
      OutstandingBalance: Number(OutstandingBalance) || 0,
      totalDeposits: {
        amount: Number(totalDeposits) || 0,
        type: depositType || "Credit",
      },
      totalCosts: Number(totalCosts) || 0,
    });

    res.status(201).json({
      message: "Case created successfully",
      case: newCase,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create case",
      error: error.message,
    });
  }
};

export const getCaseByNumber = async (req, res) => {
  try {
    const { caseNumber } = req.params;

    const foundCase = await Case.findOne({
      caseNumber: caseNumber.trim(),
    });

    if (!foundCase) {
      return res.status(404).json({
        message: "Case not found",
      });
    }

    res.json({
      case: foundCase,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to find case",
      error: error.message,
    });
  }
};


export const getAllCases = async (req, res) => {
  try {
    const cases = await Case.find()
      .sort({ createdAt: -1 })
      .select(
        "caseNumber court caseCaption judge filedDate caseType"
      );

    res.json({
      cases,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch cases",
      error: error.message,
    });
  }
};


export const deleteCase = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCase = await Case.findByIdAndDelete(id);

    if (!deletedCase) {
      return res.status(404).json({
        message: "Case not found",
      });
    }

    res.status(200).json({
      message: "Case deleted successfully",
    });
  } catch (error) {
    console.error("Delete case error:", error);

    res.status(500).json({
      message: "Failed to delete case",
      error: error.message,
    });
  }
};