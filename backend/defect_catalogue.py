DEFECT_CATALOGUE = {
    "Scratches": {
        "severity": "medium",
        "description": "Linear surface marks caused by abrasive contact during handling or processing.",
        "recommendation": "Inspect for depth exceeding 0.1mm. Surface grinding may restore tolerance. Flag for rejection if scratch density exceeds 3/cm²."
    },
    "Patches": {
        "severity": "medium",
        "description": "Discolored or irregular surface areas caused by oxidation, contamination, or uneven rolling pressure.",
        "recommendation": "Assess patch area relative to total surface. Localised patches less than 2% total area may be acceptable."
    },
    "Slivers": {
        "severity": "high",
        "description": "Thin flakes of steel partially attached to the surface, caused by inclusions or laps being rolled into the surface.",
        "recommendation": "Immediate removal from production line. Full ultrasonic inspection of the coil batch recommended."
    },
    "Rolled-in Scale": {
        "severity": "high",
        "description": "Iron oxide scale pressed into the surface during hot rolling. Appears as dark, pitted, or flaky regions.",
        "recommendation": "Reject for applications requiring coatings. Acid pickling may remove scale; reinspect after treatment."
    },
    "Pits / Pitting": {
        "severity": "medium",
        "description": "Small surface cavities caused by scale removal, corrosion, or hydrogen embrittlement.",
        "recommendation": "Measure pit depth and density. Pits deeper than 0.05mm in structural applications require rejection."
    },
    "Cracks": {
        "severity": "high",
        "description": "Fracture lines on the surface caused by thermal stress or excessive deformation during processing.",
        "recommendation": "Immediate rejection required. Investigate root cause — check furnace temperature profiles and cooling rates."
    },
    "Inclusion": {
        "severity": "high",
        "description": "Non-metallic particles trapped within or on the steel surface during the steelmaking process.",
        "recommendation": "Reject for high-stress applications. Conduct metallographic analysis to determine inclusion type."
    }
}

DEFECT_NAMES = list(DEFECT_CATALOGUE.keys())