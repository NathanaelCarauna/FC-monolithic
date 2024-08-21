import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUsecase from "./find-client.usecase";

const props = {
  id: new Id("1"),
  name: "Client 1",
  email: "x@x.com",
  street: "Address 1",
  document: "doc",
  city: "city",
  complement: "complement",
  zipCode: "zip",
  number: "number",
  state: "state",
};
const client = new Client(props);

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve<Client>(client)),
  };
};

describe("Find client usecase unit tests", () => {
  it("Should find a client", async () => {
    const repository = MockRepository();
    const usecase = new FindClientUsecase(repository);

    const input = {
      id: "1",
    };
    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toEqual(props.id.id);
    expect(result.name).toEqual(props.name);    
    expect(result.email).toEqual(props.email);
    expect(result.document).toEqual(props.document);
    expect(result.city).toEqual(props.city);
    expect(result.complement).toEqual(props.complement);
    expect(result.zipCode).toEqual(props.zipCode);
    expect(result.number).toEqual(props.number);
    expect(result.state).toEqual(props.state);
    expect(result.street).toEqual(props.street);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });
});
