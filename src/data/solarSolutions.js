import { Sun, Sprout, Factory, Home } from 'lucide-react';

export const solarSolutions = [
    {
        id: "commercial-rooftop",
        icon: Sun,
        title: "Commercial Rooftop Solar Systems",
        subtitle: "Optimized solar rooftop solutions for commercial buildings, offices, institutions, and business parks.",
        description: "Large-scale ground-mounted solar power plants designed for utility companies and industrial complexes requiring multi-megawatt capacity installations.",
        heroImage: "/images/commercial-rooftop-solar.jpg",
        idealFor: ["Power generation companies", "Large industrial facilities", "Government energy projects", "Solar parks and farms"],
        benefits: [
            "Multi-megawatt capacity installations",
            "Grid-connected power generation",
            "Optimized land utilization",
            "Long-term energy security",
            "Reduced carbon emissions at scale"
        ],
        technicalSpecs: [
            "Capacity: 5 MW to 100+ MW",
            "Land requirement: 4-5 acres per MW",
            "Module efficiency: 20-22%",
            "Project timeline: 6-12 months"
        ]
    },
    {
        id: "agricultural-solar",
        icon: Sprout,
        title: "Agricultural Solar Systems",
        subtitle: "Solar-powered irrigation and farming solutions to reduce operational costs and ensure reliable water supply.",
        description: "Innovative solar solutions for agricultural applications including solar water pumps, irrigation systems, and farm power supply to enhance productivity and sustainability.",
        heroImage: "/images/agri-solar-latest.jpg",
        idealFor: ["Farms and agricultural land", "Irrigation projects", "Rural farming communities", "Greenhouse operations"],
        benefits: [
            "Reduced irrigation costs",
            "Reliable water supply for crops",
            "Energy independence for farms",
            "Lower carbon footprint",
            "Government subsidies available"
        ],
        technicalSpecs: [
            "Capacity: 1 HP to 25 HP pumps",
            "Coverage: Up to 50 acres per system",
            "Water output: 10,000-50,000 liters/day",
            "Lifespan: 20+ years"
        ]
    },
    {
        id: "industrial-rooftop",
        icon: Factory,
        title: "Industrial Rooftop Solar Systems",
        subtitle: "High-capacity rooftop solar plants designed for factories and industrial facilities to reduce energy costs and improve power reliability.",
        description: "High-capacity rooftop solar plants designed for factories and industrial facilities to reduce energy costs and improve power reliability.",
        heroImage: "/images/industrial-rooftop-new.jpg",
        idealFor: ["Manufacturing plants", "Warehouses & logistics hubs", "Commercial complexes", "Offices and IT parks"],
        benefits: [
            "Significant operational cost savings",
            "Protection against grid tariff hikes",
            "Reduced carbon footprint & compliance",
            "Predictable energy costs",
            "Efficient use of rooftop space"
        ],
        technicalSpecs: [
            "Capacity: 10 kW to 1 MW+",
            "Space requirement: 80-100 sq.ft per kW",
            "ROI period: 3-5 years",
            "Lifespan: 25+ years"
        ]
    },
    {
        id: "residential-rooftop",
        icon: Home,
        title: "Residential Rooftop Solar Systems",
        subtitle: "Smart rooftop solar solutions designed for homes, villas, and residential buildings.",
        description: "Smart rooftop solar solutions designed for homes, villas, and residential buildings with minimal maintenance and maximum savings.",
        heroImage: "/images/residential-solar-final.jpg",
        idealFor: ["Individual homes", "Residential societies", "Independent houses", "Apartment complexes"],
        benefits: [
            "Lower monthly electricity bills",
            "Clean and sustainable energy",
            "Long-term savings with minimal maintenance",
            "Increase property value",
            "Energy independence"
        ],
        technicalSpecs: [
            "Capacity: 1 kW to 10 kW",
            "Space requirement: 100 sq.ft per kW",
            "ROI period: 4-6 years",
            "Net metering available"
        ]
    }
];
