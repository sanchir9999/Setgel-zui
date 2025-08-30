export type Question = {
    id: string;
    text: string;
    reverse?: boolean;
    scaleMin: number;
    scaleMax: number;
};

export const QUESTIONS: Question[] = [
    // Stress (0..4)
    {
        id: "S1",
        text: "Та өнгөрсөн 7 хоногт стресс мэдэрсэн үү?",
        scaleMin: 0,
        scaleMax: 4,
    },
    {
        id: "S2",
        text: "Та амьдралынхаа чухал зүйлсийг өнгөрсөн 7 хоногт хянахад бэрхшээлтэй байсан уу?",
        scaleMin: 0,
        scaleMax: 4,
    },
    {
        id: "S3",
        text: "Өнгөрсөн 7 хоногт та сандарсан, стресстэй байсан уу?",
        scaleMin: 0,
        scaleMax: 4,
    },
    {
        id: "S4",
        text: "Та өнгөрсөн 7 хоногт асуудлаа шийдэхэд итгэлтэй байсан уу?",
        reverse: true,
        scaleMin: 0,
        scaleMax: 4,
    },
    {
        id: "S5",
        text: "Өнгөрсөн 7 хоногт та хэт их дарамттай байсан уу?",
        scaleMin: 0,
        scaleMax: 4,
    },
    // Happiness (1..7)
    {
        id: "H1",
        text: "Таны амьдрал өнгөрсөн 7 хоногт хүссэн шиг байсан уу?",
        scaleMin: 1,
        scaleMax: 7,
    },
    {
        id: "H2",
        text: "Өнгөрсөн 7 хоногт таны амьдралын нөхцөл маш сайн байсан уу?",
        scaleMin: 1,
        scaleMax: 7,
    },
    {
        id: "H3",
        text: "Өнгөрсөн 7 хоногт та амьдралдаа сэтгэл хангалуун байсан уу?",
        scaleMin: 1,
        scaleMax: 7,
    },
    {
        id: "H4",
        text: "Өнгөрсөн 7 хоногт амьдралдаа чухал зүйлсийг биелүүлсэн гэж боддог уу?",
        scaleMin: 1,
        scaleMax: 7,
    },
    {
        id: "H5",
        text: "Өнгөрсөн 7 хоногт амьдралаа дахин амьдрахад юу ч өөрчлөхгүй гэж бодсон уу?",
        scaleMin: 1,
        scaleMax: 7,
    },
    // EQ (1..5)
    {
        id: "E1",
        text: "Та өнгөрсөн 7 хоногт өөрийн сэтгэл хөдлөлийг мэдэрч чадсан уу?",
        scaleMin: 1,
        scaleMax: 5,
    },
    {
        id: "E2",
        text: "Та өнгөрсөн 7 хоногт бусдын сэтгэл хөдлөлийг ойлгох чадвартай байсан уу?",
        scaleMin: 1,
        scaleMax: 5,
    },
    {
        id: "E3",
        text: "Та өнгөрсөн 7 хоногт сэтгэл хөдлөлдөө автаж хариу үйлдэл үзүүлэх нь олонтоо байсан уу?",
        reverse: true,
        scaleMin: 1,
        scaleMax: 5,
    },
    {
        id: "E4",
        text: "Өнгөрсөн 7 хоногт та уурласан үедээ өөрийгөө тайвшруулж чадсан уу?",
        scaleMin: 1,
        scaleMax: 5,
    },
    {
        id: "E5",
        text: "Өнгөрсөн 7 хоногт та бусдын шүүмжлэлийг суралцах боломж гэж хүлээж авсан уу?",
        scaleMin: 1,
        scaleMax: 5,
    },
];



export const GROUPS = {
    stress: ["S1", "S2", "S3", "S4", "S5"],
    happiness: ["H1", "H2", "H3", "H4", "H5"],
    eq: ["E1", "E2", "E3", "E4", "E5"],
};
