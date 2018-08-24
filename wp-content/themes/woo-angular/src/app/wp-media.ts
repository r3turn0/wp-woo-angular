export class WpMedia {
    id: number;
    slug: string;
    title: {
        rendered: string;
    };
    caption: {
        rendered: string;
    };
    alt_text: string;
    media_details: {
        height: number;
        width: number;
        sizes: {
            thumbnail: {
                source_url: string;
            };
            medium: {
                source_url: string;
            };
            large: {
                source_url: string;
            };
            full: {
                source_url: string;
            };
            landscape: {
                source_url: string;
            };
            portrait: {
                source_url: string;
            };
            square: {
                source_url: string;
            };
        }
    }
}