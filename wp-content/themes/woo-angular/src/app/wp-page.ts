export class WpPage {
    id: number;
    slug: string;
    link: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    status: string;
    menu_order: number;
    featured_image: string;
}