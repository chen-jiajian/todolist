interface ItodoItem {
    state: boolean;
    content: string;
    id: string;
}
interface IFetch {
    code: number;
    data: any;
}

exports.ItodoItem = ItodoItem;
exports.IFetch = IFetch;