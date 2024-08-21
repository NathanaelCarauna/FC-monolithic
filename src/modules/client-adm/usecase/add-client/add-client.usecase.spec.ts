import AddClientUsecase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    }
}

describe("Add client Usecase unit test", () => {
    it("Should add a client", async () => {
        const repository = MockRepository();
        const usecase = new AddClientUsecase(repository);

        const input = {
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

        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.email).toEqual(input.email);
        expect(result.email).toEqual(input.email);
        expect(result.document).toEqual(input.document);
        expect(result.city).toEqual(input.city);
        expect(result.complement).toEqual(input.complement);
        expect(result.zipCode).toEqual(input.zipCode);
        expect(result.number).toEqual(input.number);
        expect(result.state).toEqual(input.state);
        expect(result.street).toEqual(input.street);
    })
})