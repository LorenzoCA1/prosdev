from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import unittest
import time

class DoctorFunction(unittest.TestCase):
    '''def setUp(self):
        self.driver = webdriver.Chrome("D:\\Programs\\PROSDEV\\prosdev\\automation\\chromedriver.exe")
        self.driver.implicitly_wait(30)
        self.driver.maximize_window()
        self.driver.get("localhost:3000")'''
    @classmethod
    def setUpClass(inst):
        inst.driver = webdriver.Chrome("D:\\Programs\\PROSDEV\\prosdev\\automation\\chromedriver.exe")
        inst.driver.implicitly_wait(30)
        inst.driver.maximize_window()
        inst.driver.get("localhost:3000")

    def test_1_add_doctor(self):
        print("Adding Doctors Test")
        self.driver.implicitly_wait(10)
        self.addBtn = self.driver.find_element_by_xpath("/html/body/div[1]/div[2]/div[1]/div[1]/span[1]/i")
        self.addBtn.click()
        self.driver.implicitly_wait(10)
        self.inputText = self.driver.find_element_by_name("name")
        self.inputText.send_keys("UnitTest")
        self.saveBtn = self.driver.find_elements_by_id("add-doc")
        self.saveBtn[0].click()
        self.driver.refresh()
        self.doctorList = self.driver.find_elements_by_name("UNITTEST")
        assert self.doctorList[0].text == "UNITTEST"

    def test_2_edit_doctor(self):
        print("Edit Doctors Test")
        self.driver.implicitly_wait(10)
        self.editBtn = self.driver.find_element_by_xpath("/html/body/div[1]/div[2]/div[1]/div[1]/span[2]")
        self.editBtn.click()
        self.driver.implicitly_wait(40)
        self.doctor = self.driver.find_element_by_css_selector("#editDoc > div > div.menu.transition.visible > div:nth-last-child(1)")
        print(self.doctor.text)
        self.doctor.click()
        self.doctorName = self.driver.find_element_by_id("docname")
        self.doctorName.send_keys("TEST")
        self.btn = self.driver.find_element_by_xpath('//*[@id="edit-doc"]')
        time.sleep(5)
        self.btn.click()
        self.doctorList = self.driver.find_elements_by_name("TEST")
        assert self.doctorList[0].text == "TEST"

    def test_3_delete_doctor(self):
        print("Delete Doctors Test")
        self.driver.implicitly_wait(10)
        self.editBtn = self.driver.find_element_by_xpath("/html/body/div[1]/div[2]/div[1]/div[1]/span[2]")
        self.editBtn.click()
        self.driver.implicitly_wait(40)
        self.doctor = self.driver.find_element_by_css_selector("#editDoc > div > div.menu.transition.visible > div:nth-last-child(1)")
        print(self.doctor.text)
        self.doctor.click()
        self.btn = self.driver.find_element_by_xpath('//*[@id="del-doc"]')
        time.sleep(5)
        self.btn.click()


    @classmethod
    def tearDownClass(inst):
        inst.driver.quit()

if __name__ == '__main__':
    unittest.main()