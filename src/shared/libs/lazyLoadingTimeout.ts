export function lazyLoadingTimeout<T>(dynamicImport: Promise<T>, countMSec: number): Promise<T> {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(dynamicImport); }, countMSec);
    });
}
