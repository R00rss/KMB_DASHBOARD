import { useEffect, useState } from "react";

export default function useTitle(default_title) {
    const [title, set_title] = useState(default_title);

    function change_title(title) {
        set_title(title);
    }
    function get_title() {
        return title;
    }
    useEffect(() => {
        document.title = title;
    }, [title]);

    return { change_title, get_title }
}
