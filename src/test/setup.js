import "@testing-library/jest-dom/vitest";
import {beforeAll,afterEach,afterAll,vi} from "vitest";
import {server} from "./server";

class IntersectionObserverMock{
  constructor(callback){
    this.callback=callback;
  }
  observe(){
    this.callback([{isIntersecting:true}],this);
  }
  unobserve(){}
  disconnect(){}
  takeRecords(){
    return [];
  }
}

beforeAll(()=>{
  vi.stubGlobal("IntersectionObserver",IntersectionObserverMock);
  server.listen();
});

afterEach(()=>{
  server.resetHandlers();
  vi.clearAllMocks();
});

afterAll(()=>{
  server.close();
  vi.unstubAllGlobals();
});