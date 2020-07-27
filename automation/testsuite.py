import unittest
from ui_test.NavigationAutomation import SimpleNavigation

nav_test =unittest.TestLoader().loadTestsFromTestCase(SimpleNavigation)


test_suite = unittest.TestSuite([nav_test])

unittest.TextTestRunner(verbosity=2).run(test_suite)
