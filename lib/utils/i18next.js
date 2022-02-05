import i18next from 'i18next';

export default async function({ fallbackLng = 'en', ...opts } = {}, resources) {
    await i18next.init({ ...opts, fallbackLng });
    for (const ns in resources) {
        for (const lng in resources[ns]) {
            await i18next.addResourceBundle(lng, ns, resources[ns][lng]);
        }
    }
    return i18next;
}
