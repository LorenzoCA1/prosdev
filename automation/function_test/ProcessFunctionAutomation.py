from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import unittest
import time


class ProcessFunction(unittest.TestCase):
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

    def test_1_add_process(self):
        print("Adding Process Test")
        self.driver.implicitly_wait(10)
        self.addBtn = self.driver.find_element_by_xpath("/html/body/div[1]/div[2]/div[2]/div[1]/span[1]/i")
        self.addBtn.click()
        self.driver.implicitly_wait(10)
        self.inputText = self.driver.find_element_by_id("procname")
        self.inputText.send_keys("UnitTest")
        self.saveBtn = self.driver.find_elements_by_id("add-proc")
        self.saveBtn[0].click()
        self.driver.refresh()
        self.doctorList = self.driver.find_elements_by_id("UnitTest proc")
        assert self.doctorList[0].text == "UNITTEST"

    def test_2_edit_process(self):
        print("Edit Process Test")
        self.driver.implicitly_wait(10)
        self.editBtn = self.driver.find_element_by_xpath("/html/body/div[1]/div[2]/div[2]/div[1]/span[2]")
        self.editBtn.click()
        self.driver.implicitly_wait(40)
        self.process = self.driver.find_element_by_css_selector("#proc-form > div.content > div.required.field.fieldProcedures > div > div.menu.transition.visible > div:nth-last-child(1)")
        print(self.process.text)
        self.process.click()
        self.processName = self.driver.find_element_by_id("procname")
        self.processName.send_keys("test")
        self.btn = self.driver.find_element_by_xpath('//*[@id="edit-proc"]')
        time.sleep(5)
        self.btn.click()
        self.procList = self.driver.find_elements_by_id("test proc")
        assert self.procList[0].text == "TEST"

    def test_3_delete_process(self):
        print("Delete Process Test")
        self.driver.implicitly_wait(10)
        self.editBtn = self.driver.find_element_by_xpath("/html/body/div[1]/div[2]/div[2]/div[1]/span[2]")
        self.editBtn.click()
        self.driver.implicitly_wait(40)
        self.process = self.driver.find_element_by_css_selector("#proc-form > div.content > div.required.field.fieldProcedures > div > div.menu.transition.visible > div:nth-last-child(1)")
        print(self.process.text)
        self.process.click()
        self.btn = self.driver.find_element_by_xpath('//*[@id="del-proc"]')
        time.sleep(5)
        self.btn.click()

    @classmethod
    def tearDownClass(inst):
        inst.driver.quit()

if __name__ == '__main__':
    unittest.main()