import React from 'react';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import { Calculator, LineChart, GraduationCap, BookOpen, Target, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const features = [
        {
            title: "CWA to GPA Converter",
            description: "Instantly convert your strict KNUST CWA to standard GPA formats (4.0 & 5.0) recognised globally.",
            icon: Calculator,
            linkTo: "/converter"
        },
        {
            title: "Course Simulator",
            description: "Plan your semester. Add expected grades for your courses and see exactly how they impact your CWA.",
            icon: LineChart,
            linkTo: "/simulator"
        },
        {
            title: "Improvement Planner",
            description: "Set a target GPA and get a semester-by-semester breakdown of exactly what grades you need to hit it.",
            icon: Target,
            linkTo: "/planner"
        },
        {
            title: "Scholarship Checker",
            description: "See matching scholarships and exact eligibility requirements based on your fresh GPA calculation.",
            icon: GraduationCap,
            linkTo: "/scholarships"
        },
        {
            title: "University Readiness",
            description: "Compare your academic profile against top universities in the US, UK, Canada, and Europe.",
            icon: ShieldCheck,
            linkTo: "/readiness"
        },
        {
            title: "GPA Literacy Hub",
            description: "Learn how the grading systems work, review FAQs, and understand what admissions committees really look for.",
            icon: BookOpen,
            linkTo: "/literacy"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } }
    };

    return (
        <div className="main-content">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <HeroSection />
            </motion.div>

            <section style={styles.featuresSection}>
                <div style={{ marginBottom: '32px' }}>
                    <h2 className="section-heading">What GradeSync Can Do</h2>
                    <p style={{ color: 'var(--color-subtext)', fontSize: '15px', maxWidth: '520px', marginTop: '6px' }}>
                        Six tools built specifically for KNUST students — from GPA conversion to scholarship matching.
                    </p>
                </div>

                <motion.div
                    className="grid-container"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {features.map((feature, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <FeatureCard
                                title={feature.title}
                                description={feature.description}
                                icon={feature.icon}
                                linkTo={feature.linkTo}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </div>
    );
};

const styles = {
    featuresSection: {
        padding: '40px 0'
    }
};

export default Home;
