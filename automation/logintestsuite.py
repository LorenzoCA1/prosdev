import unittest
from secretary_test.SecretaryLogInLogOutAutomationTest import SecretaryLoginFunction
from admin_test.AdminLoginLogOutAutomationTest import AdminLoginFunction
from patient_test.PatientLogInLogOutAutomationTest import PatientLoginFunction

login_test0 = unittest.TestLoader().loadTestsFromTestCase(SecretaryLoginFunction)
login_test1 = unittest.TestLoader().loadTestsFromTestCase(AdminLoginFunction)
login_test2 = unittest.TestLoader().loadTestsFromTestCase(PatientLoginFunction)

login_suite = unittest.TestSuite([login_test0, login_test1, login_test2])

unittest.TextTestRunner(verbosity=3).run(login_suite)
