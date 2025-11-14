import React from "react";
import { Paper } from "@mui/material";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import StarIcon from "@mui/icons-material/Star";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SliderRow from "components/SliderRow";
import AppCard from "components/AppCard";

const AppsSliderBlock = ({ title, iconType, items, onOpenApp, variant = "plain" }) => {
    if (!items || items.length === 0) return null;

    const icon =
        iconType === "hot" ? (
            <WhatshotIcon sx={{ color: "#ef4444" }} />
        ) : iconType === "new" ? (
            <StarIcon sx={{ color: "#f97316" }} />
        ) : iconType === "editors" ? (
            <WorkspacePremiumIcon sx={{ color: "#22c55e" }} />
        ) : null;

    const bg = variant === "subtle" ? "#f9fafb" : "#ffffff";

    return (
        <Paper
            elevation={0}
            sx={{
                mb: 3,
                p: 2,
                borderRadius: 3,
                bgcolor: bg,
                border: "1px solid #e5e7eb",
            }}>
            <SliderRow
                title={title}
                icon={icon}
                items={items}
                renderItem={app => (
                    <AppCard
                        app={app}
                        onClick={() => onOpenApp(app)}
                    />
                )}
            />
        </Paper>
    );
};

export default AppsSliderBlock;
