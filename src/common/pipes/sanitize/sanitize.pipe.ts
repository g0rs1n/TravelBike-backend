
import { 
    ArgumentMetadata,
    Injectable,
    PipeTransform
} from "@nestjs/common";
import { sanitize } from "src/common/sanitize/sanitize";

@Injectable()
export class SanitizePipe implements PipeTransform {
    transform(value: unknown, _metadata: ArgumentMetadata) {
        if (typeof value === "string") {
            return sanitize(value)
        } else {
            return value
        }
    }
}