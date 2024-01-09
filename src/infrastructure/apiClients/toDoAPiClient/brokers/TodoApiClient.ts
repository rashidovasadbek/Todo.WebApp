import ApiClientBase from "@/infrastructure/apiClients/apiClientBase/ApiClientBase";
import {TodoEndpointsDetails} from "@/infrastructure/apiClients/toDoAPiClient/brokers/TodoEndPointsDetails";

export class TodoApiClient {
    private readonly client: ApiClientBase;
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = "https://localhost:7176";

        this.client = new ApiClientBase({
            baseURL: this.baseUrl
        });

        this.todos = new TodoEndpointsDetails(this.client)
    }

    public todos: TodoEndpointsDetails;
}