export type GeneratedMediaCardVariant =
    | "creator"
    | "post"
    | "video"
    | "tier"
    | "stat"
    | "community";

export type GeneratedMediaCard = {
    id: string;
    variant: GeneratedMediaCardVariant;
    eyebrow: string;
    title: string;
    detail: string;
    depth: "foreground" | "midground" | "background";
    restingX: string;
    restingY: string;
};

export const generatedMediaCards = [
    {
        id: "creator-studio",
        variant: "creator",
        eyebrow: "Creator profile",
        title: "Mara builds in public",
        detail: "Abstract avatar, handle, and supporter rhythm for a featured creator.",
        depth: "foreground",
        restingX: "-10%",
        restingY: "4%",
    },
    {
        id: "editorial-drop",
        variant: "post",
        eyebrow: "Member post",
        title: "Behind-the-scenes drop",
        detail: "Generated post preview with copy lines, tags, and engagement markers.",
        depth: "midground",
        restingX: "6%",
        restingY: "-6%",
    },
    {
        id: "field-note-video",
        variant: "video",
        eyebrow: "Media preview",
        title: "Studio field note",
        detail: "CSS-only video tile with play affordance and layered color bands.",
        depth: "background",
        restingX: "-4%",
        restingY: "10%",
    },
    {
        id: "studio-pass-tier",
        variant: "tier",
        eyebrow: "Membership tier",
        title: "Studio Pass",
        detail: "Benefit stack and price framing without checkout or billing logic.",
        depth: "foreground",
        restingX: "8%",
        restingY: "8%",
    },
    {
        id: "momentum-stat",
        variant: "stat",
        eyebrow: "Momentum signal",
        title: "3.8k returning members",
        detail: "Synthetic metric card for conversion storytelling and product proof.",
        depth: "midground",
        restingX: "-6%",
        restingY: "-2%",
    },
    {
        id: "community-pulse",
        variant: "community",
        eyebrow: "Community tile",
        title: "Live room pulse",
        detail: "Stacked member bubbles and prompt snippets for active community energy.",
        depth: "background",
        restingX: "5%",
        restingY: "6%",
    },
] satisfies GeneratedMediaCard[];