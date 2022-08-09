import {v4} from "uuid"

export default class FPNode {
    id: string = `node_${v4()}`;
}