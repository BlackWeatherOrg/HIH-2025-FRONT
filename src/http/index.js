import axios from "axios";

const api = axios.create({
    baseURL: "https://api.hih.blackweather.ru/api/v1",
    timeout: 10000,
});

const mapApplication = apiApp => ({
    id: apiApp.id,
    name: apiApp.name,
    rating: apiApp.rating,
    popularity: apiApp.popularity,
    createdAt: apiApp.created_at,
    editorsChoice: apiApp.editors_choice,
    category: apiApp.category,
    developer: apiApp.developer,
    age: apiApp.age,
    description: apiApp.description,
    downloads: apiApp.downloads,
    apkSize: apiApp.apk_size,
    screenshots: apiApp.screenshots || [],
    iconLink: apiApp.icon_link,
    funFact: apiApp.fun_fact,
    apkLink: apiApp.apk_link,
});

export const fetchApplications = async (params = {}) => {
    const { data } = await api.get("/applications/get_many", {
        params: {
            return_in_order: true,
            ...params,
        },
    });
    return Array.isArray(data) ? data.map(mapApplication) : [];
};

export const fetchApplicationById = async id => {
    const apps = await fetchApplications({ id, limit: 1 });
    return apps[0] || null;
};

export const fetchCategories = async () => {
    const { data } = await api.get("/categories/get_all");
    const list = Array.isArray(data?.categories) ? data.categories : [];
    const withAll = list.includes("Все приложения") ? list : ["Все приложения", ...list];

    return withAll;
};