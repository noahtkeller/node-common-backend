import i18next from 'i18next';

export default async function({ fallbackLng = 'en', interpolation = {}, ...opts } = {}, resources = {}) {
    const defaultInterpolations = {
        format(value, format, language) {
            if (typeof value === 'number') {
                if (format.startsWith('precision-')) {
                    const points = parseInt(format.replace('precision-', ''));
                    return value.toLocaleString(language, { minimumFractionDigits: points, maximumFractionDigits: points });
                }
            }
            return value;
        },
    };
    await i18next.init({ ...opts, fallbackLng, interpolation: { ...defaultInterpolations, ...interpolation } });
    const proms = [];
    for (const ns in resources) {
        for (const lng in resources[ns]) {
            proms.push(i18next.addResourceBundle(lng, ns, resources[ns][lng]));
        }
    }
    await Promise.all(proms);
    return i18next;
}
