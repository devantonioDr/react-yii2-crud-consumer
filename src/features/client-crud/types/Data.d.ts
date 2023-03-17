interface RepairStatus {
  _id: string;
  key: number;
  title: string;
  description: string;
}
[];

interface branchOffices {
  _id: string;
  name: string;
}

interface ClientData {
  id: number
  email: string
  phone: string
  status: number
  address: {
    id: number
    address_line_1: string
    address_line_2: string
    city: string
    state: string
    country: string
    zip_code: string
  }
  perfil: {
    id: number
    first_name: string
    last_name: string
    date_of_birth: string
    gender: string
    description: string
  }
}

interface RepairData {
  device: {
    blocking: {
      hasBlocking: boolean;
      patreon: never[];
    };
    trademark: string;
    model: string;
    color: string;
    canStart: boolean;
    beforeRepaired: boolean;
    presentsMoisture: boolean;
    reasonForAdmission: string;
    state?: string;
  };
  branchOffice: branchOffices;
  customer: {
    phoneNumber: null | string;
    email: null | string;
    adress: null | string;
    name: string;
  };
  payment: {
    estimatedCost: number | null;
    prePayment: number | null;
  };
  technician: {
    _id: string;
    name: string;
  } | null;
  _id: string;
  invoiceId: string;
  status: RepairStatus;
  admissionDate: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
}
